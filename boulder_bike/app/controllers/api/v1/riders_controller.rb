module Api
  module V1
    class RidersController < ApplicationController
      before_action :set_rider, only: [:show, :update, :destroy]

      # GET /api/v1/riders
      def index
        @riders = Rider.all
        render json: @riders
      end

      # GET /api/v1/riders/:id
      def show
        render json: @rider
      end

      # POST /api/v1/riders
      def create
        @rider = Rider.new(rider_params)

        if @rider.save
          render json: @rider, status: :created
        else
          render json: @rider.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/riders/:id
      def update
        if @rider.update(rider_params)
          render json: @rider
        else
          render json: @rider.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/riders/:id
      def destroy
        @rider.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_rider
          @rider = Rider.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def rider_params
          params.require(:rider).permit(:first_name, :last_name, :city)
        end
    end
  end
end
