namespace :import do
  desc "Import riders from JSON file"
  task riders: :environment do
    require 'json'

    # Chemin vers le fichier JSON contenant les données des riders
    json_file = File.join(Rails.root, 'path/to/riderData.json')

    # Lecture du fichier JSON
    json_data = File.read(json_file)

    # Parsing du JSON
    riders = JSON.parse(json_data)

    # Création des enregistrements Rider
    riders.each do |rider|
      Rider.create!(
        first_name: rider['firstName'],
        last_name: rider['lastName'],
        city: rider['city'],
        state: rider['state'],
        latitude: rider['latitude'],
        longitude: rider['longitude']
      )
    end

    puts "Imported #{riders.size} riders from JSON file."
  end
end
