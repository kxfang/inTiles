require 'json'
require 'nokogiri'
require 'open-uri'

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
    count = Integer(params[:count])
    json_response = li_oauth_access_token.get("/v1/people/~/connections", 'x-li-format' => 'json').body
    connections = JSON.parse(json_response)["values"].select {|connection| connection.has_key?("pictureUrl")}.shuffle[0..count-1]
    names = Array.new
    pics = Array.new
    connections.each {|connection| 
      names.push(id: connection["id"], firstName: connection["firstName"], lastName: connection["lastName"])
      pics.push(id: connection["id"], pictureUrl: connection["pictureUrl"]) 
       }
    render :json => { names: names.shuffle, pictures: pics }
  end
  
  def background_image_url
    doc = Nokogiri::HTML(open('http://photography.nationalgeographic.com/photography/photo-of-the-day'))
    foo = nil
    doc.css('div.primary_photo a img').each do |img_tag|
     url = img_tag.attr('src')
     render :json => { image: url }
    end
  end

end
