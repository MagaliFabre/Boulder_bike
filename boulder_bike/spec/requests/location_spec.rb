require 'rails_helper'
describe 'Locations API', type: :request do
  it 'returns all locations' do
    get '/api/v1/locations'

    expect(response).to have_http_status(:success)
  end
end

# RSpec.describe "Locations", type: :request do
#   describe "GET /api/v1/locations" do
#     it "returns a list of locations" do
#       # Récupérer les locations depuis la base de données
#       locations = Location.all

#       # Faire la requête HTTP pour obtenir la liste des locations
#       get "/api/v1/locations"

#       # Assurer que la requête a réussi
#       expect(response).to have_http_status(200)

#       # Convertir le corps de la réponse en JSON
#       locations_json = JSON.parse(response.body)

#       # Comparer les données récupérées avec les données de la base de données
#       expect(locations_json.length).to eq(locations.length)

#       # Assurer que chaque location dans la base de données est inclus dans la réponse
#       locations.each do |location|
#         expect(locations_json).to include(
#           a_hash_including(
#             "name" => location.name,
#             "address" => location.address,
#             # Ajoutez d'autres attributs de location si nécessaire
#           )
#         )
#       end
#     end
#   end
# end
