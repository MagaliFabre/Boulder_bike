class Submission < ApplicationRecord
  validates :slogan, presence: true, length: { maximum: 50 }
end
