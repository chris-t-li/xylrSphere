class CreatePricings < ActiveRecord::Migration[7.0]
  def change
    create_table :pricings do |t|
      t.belongs_to :nft, null: false, foreign_key: true
      t.belongs_to :coin, null: false, foreign_key: true
      t.float :price_nft

      t.timestamps
    end
  end
end
