# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'floatlabels/version'

Gem::Specification.new do |spec|
  spec.name          = "floatlabels"
  spec.version       = Floatlabels::VERSION
  spec.authors       = ["Matt Cameron"]
  spec.email         = ["mattlbcameron@gmail.com"]

  spec.summary       = "Easily use floating labels on text inputs."
  spec.description   = "Automatically use placeholders as a floating label to save space and add context to your forms. Follows the famous Float Label Pattern. Built on jQuery."
  spec.homepage      = "https://github.com/mattcameron/floatlabels"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.11"
  spec.add_development_dependency "rake", "~> 10.0"
end
