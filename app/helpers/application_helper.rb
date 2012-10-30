module ApplicationHelper

  def page_title_for title
    base_title = "InTiles"
    if title.empty?
      base_title
    else
      "#{base_title} | #{title}"
    end
  end

  def li_oauth_consumer
    OAuth::Consumer.new("1jswo8g8j742", "JWSXQohvMXYx3DXS",
      site: "http://api.linkedin.com")
  end

  def li_oauth_access_token
    token_hash = { :oauth_token => session[:user][:token],
      :oauth_token_secret => session[:user][:secret]
    }
    OAuth::AccessToken.from_hash(li_oauth_consumer, token_hash )
  end

end
