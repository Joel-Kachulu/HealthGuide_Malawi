from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from geopy.geocoders import Nominatim
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db' 
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Location data model
class LocationData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location_name = db.Column(db.String)

    def __init__(self, location_name):
        self.location_name = location_name

# Location schema
class LocationDataSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = LocationData

location_data_schema = LocationDataSchema()
locations_data_schema = LocationDataSchema(many=True)

@app.route('/location/', methods=['POST'])
def receiveLoc():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    geoLoc = Nominatim(user_agent='GetLoc')
    location = geoLoc.reverse((latitude, longitude))
    location_name = location.address if location else None

    if location_name:
        new_location_data = LocationData(location_name)
        db.session.add(new_location_data)
        db.session.commit()
        return jsonify({'message': 'Data saved successfully', 'location_name': location_name}), 201
    else:
        return jsonify({'error': 'Location not found'}), 404

@app.route('/get/', methods= ['GET'])
def get_location():
    locations = LocationData.query.all()
    result = locations_data_schema.dump(locations)
    return jsonify(result)

if __name__=="__main__":
    app.run(debug=True)
