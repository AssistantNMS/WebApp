$buildName=$args[0]
$buildNameString = '"' + $buildName + '"'
$Path = "./src/buildName.json"

$buildNameString | Out-File -FilePath $Path