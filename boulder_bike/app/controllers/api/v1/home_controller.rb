module Api
  module V1
    class HomeController < ApplicationController
      def index
        render json: { message: 'Welcome to the API home page' }
      end
    end
  end
end
