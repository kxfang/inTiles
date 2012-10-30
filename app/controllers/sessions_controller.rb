class SessionsController < ApplicationController

  def create
    auth = request.env['omniauth.auth']
    user = {
      uid: auth[:uid],
      name: auth[:info][:name],
      token: auth[:credentials][:token],
      secret: auth[:credentials][:secret],
    }

    session[:user] = user

    redirect_to '/tiles/game'
  end
end
