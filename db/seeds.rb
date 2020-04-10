# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Movie.create(title:'Pootie Tang', release_year:2001, director:'Louis C.K.')


Post.destroy_all
Movie.destroy_all
User.destroy_all

user1 = User.create!(username:"rico4", email:"rico4@email.com", password_digest:"1234567")
p "#{User.count} users were created"

movie1 = Movie.create!({title:"Pootie Tang", year_released:2001, director:"Louis C.K.", users:[user1]})
movie2 = Movie.create!({title:"Rock'n'roll Highschool", year_released:1980, director:"Roger Corman", users:[user1]})

p "#{Movie.count} movies were created"

post1 = Post.create!(content:"This is my first post", user:user1, movie:movie1)
post2 = Post.create!(content:"This is my second post", user:user1, movie:movie2)
p "#{Post.count} posts were created"