# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Movie.create(title:'Pootie Tang', release_year:2001, director:'Louis C.K.')

user1 = User.create!(username:"rico4", email:"rico4@email.com", password_digest:"1234567")
p "#{User.count} users were created"

movies = Movie.create!([{title:"Pootie Tang", year_released:2001, director:"Louis C.K.", users:[user1]},
{title:"Rock'n'roll Highschool", year_released:1980, director:"Roger Corman", users:[user1]},])

p "#{Movie.count} movies were created"