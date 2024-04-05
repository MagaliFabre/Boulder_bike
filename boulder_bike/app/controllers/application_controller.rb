class ApplicationController < ActionController::API
  def api_default
    render plain: "Welcome to the API endpoint!"
  end
end
