$buildName=$args[0]
$buildNameString = '"' + $buildName + '"'
$Path = "./buildName.json"

$buildNameString | Out-File -FilePath $Path