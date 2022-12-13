class CreatePortfolios < ActiveRecord::Migration[7.0]
  def change
    create_table :portfolios do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :nft, null: false, foreign_key: true
      t.boolean :watchlist
      t.boolean :ownership
      t.boolean :on_market

      t.timestamps
    end
  end
end
