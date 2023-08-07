require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))


Pod::Spec.new do |s|
  s.name            = package["name"]
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"

  s.dependency "React"
  s.dependency 'AdBrixRmKit'
  
  s.subspec 'AdBrixRmKit' do |ss|
    # 배포전에 꼭 확인!!
    ss.source_files = "~/Desktop/jimmy.gangsehun/Desktop/COCOA/SDK-V2-IOS-Abx.Remaster-Cocoapod/**"
  end

end