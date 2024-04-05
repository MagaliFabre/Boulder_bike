require 'rails_helper'

describe 'Riders API', type: :request do
  it 'return all riders' do
    get '/api/v1/riders'

    expect(response).to have_http_status(:success)
  end
end
RSpec.describe "Riders", type: :request do
  describe "GET /api/v1/riders" do
    it "returns a list of riders" do
      # Récupérer les riders depuis la base de données
      riders = Rider.all

      # Faire la requête HTTP pour obtenir la liste des riders
      get "/api/v1/riders"

      # Assurer que la requête a réussi
      expect(response).to have_http_status(200)

      # Convertir le corps de la réponse en JSON
      riders_json = JSON.parse(response.body)

      # Comparer les données récupérées avec les données de la base de données
      expect(riders_json.length).to eq(riders.length)

      # Assurer que chaque rider dans la base de données est inclus dans la réponse
      riders.each do |rider|
        expect(riders_json).to include(
          a_hash_including(
            "first_name" => rider.first_name,
            "last_name" => rider.last_name,
            "city" => rider.city,
            "state" => rider.state,
            "latitude" => rider.latitude,
            "longitude" => rider.longitude
          )
        )
      end
    end
  end
end
