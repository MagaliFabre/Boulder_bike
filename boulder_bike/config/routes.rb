Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/home', to: 'home#index' # Route pour la page d'accueil de l'API
      resources :submissions
      resources :locations
      resources :riders
    end
  end

  # Définition des routes pour l'API
  get '/api', to: 'application#api_default'

  # Route pour la vérification de la santé de l'application Rails
  get "up" => "rails/health#show", as: :rails_health_check

  # Rediriger toutes les autres requêtes vers l'application React
  get '*path', to: 'application#react_app'

  # Page d'accueil avec le décompte
  root 'home#index'

  # Supprimer les lignes pour éviter les conflits avec les routes API dans le namespace api/v1
  # resources :riders, only: [:index]
  # resources :locations
  # resources :submissions, only: [:index, :new, :create]
end
