Rails.application.routes.draw do
  resources :pricings, only: [:create]
  # resources :wallets
  # resources :coins
  # resources :portfolios
  resources :nfts, only: [:index]
  resources :users, only: [:show, :create, :destroy]

  # User Auth routes
  get "/login", to: "sessions#show"
  post "/login", to: "sessions#create"
  delete "/login", to: "sessions#destroy"
end
