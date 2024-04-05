class Api::V1::SubmissionsController < ApplicationController
  # POST /api/v1/submissions
  def create
    @submission = Submission.new(submission_params)

    if @submission.save
      render json: @submission, status: :created
    else
      render json: @submission.errors, status: :unprocessable_entity
    end
  end

  private

  # Only allow a trusted parameter "white list" through.
  def submission_params
    params.require(:submission).permit(:first_name, :last_name, :email, :slogan)
  end

end
