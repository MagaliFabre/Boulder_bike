require "test_helper"

class Api::V1::RidersControllerTest < ActionDispatch::IntegrationTest

  test "should get show" do
    get api_v1_riders_show_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_riders_create_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_riders_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_riders_destroy_url
    assert_response :success
  end
end
