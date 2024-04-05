require 'json'

# Lecture du fichier JSON
file = File.read('./db/seed/riders_data.json')
riders_data = JSON.parse(file)

# Création des riders
riders_data.each do |rider_data|
  Rails.logger.debug "Données du rider : #{rider_data.inspect}" # Ajout du débogage ici
  rider = Rider.new(
    first_name: rider_data['first_name'],
    last_name: rider_data['last_name'],
    city: rider_data['city'],
    state: rider_data['state'],
    latitude: rider_data['latitude'],
    longitude: rider_data['longitude']
  )

  if rider.save
    puts "Rider créé avec succès : #{rider.first_name} #{rider.last_name}"
  else
    puts "Erreur lors de la création du rider : #{rider.errors.full_messages.join(', ')}"
  end
end
