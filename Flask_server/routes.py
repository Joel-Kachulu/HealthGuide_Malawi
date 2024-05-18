from app import db
from flask import Flask, jsonify, request

#login route
"""
@app.route('/login', methods= ['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        return jsonify({'message': 'login successful', 'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401


@app.route('/signup', methods= ['POST'])
def signup():
    data = request.json
    fullName = data.get('fullName')
    email = data.get('email')
    password = data.get('password') 

    if not fullName or not email or not password:
        print(NameError)
        return jsonify({'message': 'Username, email, and password are required'}), 400
        
    
     # Check if user already exists
    if User.query.filter_by(username=fullName).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Username or email already exists'}), 400
    
    #create a new user
    new_user = User(username=fullName, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully', 'user': {
       'id': new_user.id,
       'username': new_user.username,
       'email': new_user.email
    }}), 201"""