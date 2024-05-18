from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from geopy.geocoders import Nominatim
from sqlalchemy import func, text
from flask_caching import Cache

# Configure cache 
cache = Cache(config={'CACHE_TYPE': 'simple', 'CACHE_DEFAULT_TIMEOUT': 300})  # Cache for 5 minutes

app = Flask(__name__)
cache.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///healthguide.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)

#Models.........................................................................................................
#user models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(130), unique=True, nullable=True)
    password = db.Column(db.String(100))

    def __repr__(self):
        return f'<User {self.username}>'
    
    
#articles model
class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text) 
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

# Location and symptom  data model)
class SymptomLocationData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String)
    symptomName = db.Column(db.String)
    date = db.Column(db.DateTime, default=datetime.datetime.now())
    count = db.Column(db.Integer, default=0)

    def __init__(self, location_name, symptomName):
        self.location_name = location_name
        self.symptomName = symptomName
        self.count = 1  # Set initial count to 1 in the constructor

    @classmethod
    def get_symptom_counts_by_location(cls, threshold=100):
      """
      Queries database for symptom counts grouped by location.
      Returns a dictionary with location as key and symptom data (symptom name, count) as value.
      """

      symptom_counts = db.session.query(
          SymptomLocationData.location_name,
          SymptomLocationData.symptomName,
          func.sum(text("CASE WHEN symptomName = symptomName THEN 1 ELSE 0 END")).label('symptom_count')
      ).group_by(SymptomLocationData.location_name, SymptomLocationData.symptomName)

      # Filter results based on symptom_count after aggregation
      #filtered_counts = [count for count in symptom_counts if count.symptom_count > 10]

      location_data = {}
      for location, symptom, count in symptom_counts:
        if location not in location_data:
          location_data[location] = {}
        location_data[location][symptom] = count

      return location_data
   
   
  



#models ends here....................................................................................................         

#Marshmallow schemas..................................................................................................
class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


article_Schema = ArticleSchema()
articles_Schema = ArticleSchema(many=True)

#Location schema
# Symptom and Location schema
class SymptomLocationDataSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SymptomLocationData

SymptomLocationData_data_schema = SymptomLocationDataSchema()
SymptomZLocationZData_schema = SymptomLocationDataSchema(many=True)
#schemas ends here...................................................................................................


#routes starts here.....................................................................................................

#articles routes
@app.route('/get', methods= ['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_Schema.dump(all_articles)
    return jsonify(results)

@app.route('/add/', methods=['POST'])
def add_article():
    try:
        title = request.json['title']
        body = request.json['body']

    except KeyError:
        return jsonify({"error" : "Missing 'body' in request data"}), 400

    articles = Articles(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_Schema.jsonify(articles)

@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Articles.query.get(id)
    return article_Schema.jsonify(article)

@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)
    
    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    return article_Schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)
    db.session.delete(article)

    db.session.commit()
    return article_Schema.jsonify(article)
#articles routes end here...................................................................................................


#location data routes

#Grobol function to translate coordinates to actual address
def reverse_coordinates(latitude, longitude):
     geoLoc = Nominatim(user_agent='GetLoc')
     location = geoLoc.reverse((latitude, longitude))
     location_name = location.address if location else None
     return location_name

#function to aggregate symptoms based on location
def aggregate_symptoms(location_name, symptom_name):
  # Option 1: Update Existing Entry (Efficient for Frequent Reports)

  existing_data = SymptomLocationData.query.filter_by(location_name=location_name, symptomName=symptom_name).first()

  if existing_data:
    existing_data.date = datetime.datetime.now()  # Update timestamp
    existing_data.count += 1  # Increment count
  else:
    # Option 2: Create New Entry (For Initial Reports)
    new_entry = SymptomLocationData(location_name, symptom_name, count=1)  # Set initial count
    db.session.add(new_entry)

  # Regardless of update or creation, commit changes
  db.session.commit()

#function to filter symptoms above threshold
def filter_locations():
  """
  Retrieves and filters symptom data by location based on a threshold.
  Returns a dictionary containing filtered locations with symptom counts exceeding the threshold.
  """
  symptomData = SymptomLocationData.get_symptom_counts_by_location(threshold=10)  # Assuming threshold is 10
  filtered_locations = {}
  for location, symptom_counts in symptomData.items():
      filtered_location_data = {symptom: count for symptom, count in symptom_counts.items() if count > 10}
      if filtered_location_data:  # Check if any symptom count exceeded threshold
          filtered_locations[location] = filtered_location_data
  return filtered_locations


# maps in client side will be drawn from here

@cache.cached(timeout=300)
def cache_high_risk_locations():
    """
    Returns a list of locations with symptom counts exceeding the threshold.
    """
    filtered_locations = cache.get('filtered_locations')
    if not filtered_locations:
        # Cache miss - Fallback to fetching and caching data
        filtered_locations = filter_locations()  # Call your function to fetch data
        cache.set('filtered_locations', filtered_locations, timeout=300)
    return filter_locations


# maps in client side will be drawn from here
@app.route('/get-high-risk-locations/', methods=['GET'])
def get_high_risk_locations_json():
  filtered_locations = filter_locations()  # Call the existing function
  return jsonify(filtered_locations)


#API endpoint to receive location and symptom data
@app.route('/location/', methods=['POST'])
def receiveLoc():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    symptomName = data.get('symptomName').lower()

    location_name = reverse_coordinates(latitude, longitude)

    if location_name and symptomName:
        new_Symptomlocation_data = SymptomLocationData(location_name, symptomName)
        db.session.add(new_Symptomlocation_data)
        db.session.commit()
        aggregate_symptoms(location_name, symptomName) 
        return jsonify({'message': 'Data saved successfully', 'location_name': location_name, 'symptomName': symptomName}), 201
        
    else:
        return jsonify({'error': 'Location not found'}), 404
    


@app.route('/symptoms/bylocation/', methods=['GET'])
def get_symptoms_by_location():
    location_data = SymptomLocationData.get_symptom_counts_by_location()
    # No need for further transformation, data is already a dictionary
    return jsonify(location_data)



@app.route('/track-location/', methods=['POST'])
def track_location():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    location_name = reverse_coordinates(latitude, longitude)

    # Check cache or fetch filtered locations (assuming filtering logic exists elsewhere)
    filtered_locations = cache.get('filtered_locations')
    if not filtered_locations:
        # Cache miss (empty or expired) - Refetch data
        filtered_locations = filter_locations()  # Call the dedicated function
        cache.set('filtered_locations', filtered_locations, timeout=300)

    # Check if user's location is in high-risk area
    location_data = filtered_locations.get(location_name)
    if location_data:
        location_name_with_message = f"{location_name} (WARNING: High-Risk Area)"
        # Trigger alerts or display messages on client-side based on 'location_name_with_message'
        response = {'location_name': location_name_with_message,
                    'message': ''} 
        return jsonify(response), 200
    else:
        response = {'location_name': location_name}
        return jsonify(response), 200




#routes  ends here...........................................................................................................



if __name__ == '__main__':
    app.run(host="192.168.42.104", port=3000, debug=True)
    #192.168.43.144
    #app.run(debug=True)