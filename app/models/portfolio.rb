class Portfolio < ApplicationRecord
  belongs_to :user
  belongs_to :nft
end
