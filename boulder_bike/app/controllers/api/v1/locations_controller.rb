class Api::V1::LocationsController < ApplicationController
  def index
    locations = Location.all
    render json: locations
  end

  def show
    location = Location.find(params[:id])
    render json: location
  end

  def create
  end

  def update
  end

  def destroy
  end
end
