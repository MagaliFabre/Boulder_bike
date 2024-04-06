
# Supprimer toutes les données des tables existantes
Rider.destroy_all
Location.destroy_all

# Réinitialiser la séquence des ID pour la table des locations
ActiveRecord::Base.connection.execute("TRUNCATE TABLE locations RESTART IDENTITY;")
ActiveRecord::Base.connection.execute("TRUNCATE TABLE riders RESTART IDENTITY;")

# Lecture du fichier JSON des données des riderss
riders_file = File.read('./db/seed/riders_data.json')
riders_data = JSON.parse(riders_file)

# Création des riderss et de leurs emplacements
riders_data.each do |rider_data|
  # Création du rider
  rider = Rider.new(
    id: rider_data['id'],
    first_name: rider_data['first_name'],
    last_name: rider_data['last_name'],
    latitude: rider_data['latitude'],
    longitude: rider_data['longitude'],
    city: rider_data['city'],
    state: rider_data['state']
  )

  if rider.save
    puts "Cavalier créé avec succès : #{rider.first_name} #{rider.last_name}"

    # Création de l'emplacement du rider
    location = Location.new(
      latitude: rider_data['latitude'],
      longitude: rider_data['longitude'],
      rider_id: rider.id
    )

    if location.save
      puts "Emplacement créé avec succès pour le cavalier #{rider.first_name} #{rider.last_name}"
    else
      puts "Erreur lors de la création de l'emplacement pour le cavalier #{rider.first_name} #{rider.last_name} : #{location.errors.full_messages.join(', ')}"
    end
  else
    puts "Erreur lors de la création du cavalier : #{rider.errors.full_messages.join(', ')}"
  end
end
