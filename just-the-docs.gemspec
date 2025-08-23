# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "learn-merit"
  spec.version       = "0.0.1"
  spec.authors       = ["David Buckley"]
  spec.email         = ["david.buckley@meritacademy.org"]

  spec.summary       = %q{A modern, highly customizable, and responsive Jekyll theme for documention with built-in search.}
  spec.homepage      = "https://github.com/buckldav/learn-merit"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README)}i) }
  spec.executables   << 'learn-merit'

  spec.add_development_dependency "bundler"
  spec.add_runtime_dependency "jekyll"
  spec.add_runtime_dependency "jekyll-seo-tag"
  spec.add_runtime_dependency "rake"

end
