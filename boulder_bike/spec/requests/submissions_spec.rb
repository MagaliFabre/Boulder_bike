require 'rails_helper'

describe 'Submissions API', type: :request do
  before(:each) do
    Submission.destroy_all  
  end

  it 'returns an error if the slogan is longer than 50 characters' do
    slogan_too_long = "This is a slogan that exceeds fifty characters limit which is not allowed."

    post '/api/v1/submissions', params: {
      submission: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        slogan: slogan_too_long
      }
    }

    expect(response).to have_http_status(:unprocessable_entity)
    expect(response.body).to include("is too long (maximum is 50 characters)")
  end


  it 'creates a new submission if the slogan is 50 characters or less' do
    valid_slogan = "This is a valid slogan"

    post '/api/v1/submissions', params: {
      submission: {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        slogan: valid_slogan
      }
    }

    expect(response).to have_http_status(:created)
    expect(Submission.count).to eq(1)
  end
end
