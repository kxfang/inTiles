require 'json'

class MainController < ApplicationController

  def signin
  end

  def auth
  end

  def auth_callback
    redirect_to '/tiles/game'
  end

  def auth_failure
  end

  def li_connections
    json_response = li_oauth_access_token.get("/v1/people/~/connections", 'x-li-format' => 'json').body
    connections_with_pictures = JSON.parse(json_response)["values"].select {|connection| connection.has_key?("pictureUrl")}[0..53]
    logger.info connections_with_pictures.length
    render :json => Hash[:connections => connections_with_pictures]
  end

end
