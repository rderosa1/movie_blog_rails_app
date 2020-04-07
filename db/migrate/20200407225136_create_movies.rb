class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :year_released
      t.string :director

      t.timestamps
    end
  end
end
