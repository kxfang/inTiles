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
    render :json => json_response
  end

end
