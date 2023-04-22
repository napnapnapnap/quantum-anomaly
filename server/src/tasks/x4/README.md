NOTE: This task only runs on local machine. Even though path is being used in most places, this is still best ran
to run on Windows machine, which you probably have so that you can run the game as well, right? It expects
that you provide path to EXTRACTED game files from EgoSoft. At least you need to extract ship data and
translations.

More info about extraction can be found here: https://www.egosoft.com/download/x4/bonus_en.php

Prep:

```
cd "C:\"
mkdir x4
cd "C:\x4"
mkdir "extensions"
cd "C:\X4\extensions"
mkdir "ego_dlc_split"
mkdir "ego_dlc_terran"
mkdir "ego_dlc_pirate"
mkdir "ego_dlc_boron"
```

For base game:

```
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in 01.cat -in 02.cat -in 03.cat -in 04.cat -in 05.cat -in 06.cat -in 07.cat -in 08.cat -in 09.cat -out "C:\X4"
pause
```

Split Vendetta

```
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_split\ext_01.cat -in extensions\ego_dlc_split\ext_02.cat -in extensions\ego_dlc_split\ext_03.cat -out "C:\X4\extensions\ego_dlc_split"
pause
```

Cradle of Humanity

```
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_terran\ext_01.cat -in extensions\ego_dlc_terran\ext_02.cat -in extensions\ego_dlc_terran\ext_03.cat -out "C:\X4\extensions\ego_dlc_terran"
pause
```

Tides of Avarice

```
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_pirate\ext_01.cat -in extensions\ego_dlc_pirate\ext_02.cat -in extensions\ego_dlc_pirate\ext_03.cat -out "C:\X4\extensions\ego_dlc_pirate"
pause
```

Kingdom End

```
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_boron\ext_01.cat -in extensions\ego_dlc_boron\ext_02.cat -in extensions\ego_dlc_boron\ext_03.cat -out "C:\X4\extensions\ego_dlc_boron"
pause
```

Cleanup for size:

```
cd "C:\X4"
del /S *.xsd
del /S *.xsm
del /S *.xac
del /S *.xpm
del /S *.ANI
del /S *.xmf
del /S *.gz
del /S *.ogg
del /S *.dds
del /S *.bgp
del /S *.dtd
del /S *.amw
del /S *.bgf
del /S *.bsg
del /S *.dae
del /S *.xpl
del /S *.lua
del /S *.jpg
del /S *.psb
del /S *.wav
del /S *.pk
del /S *.h
del /S *.f
del /S *.v
del /S *.comp
del /S *.fh
del /S *.vh
del /S *.tcs
del /S *.tes
del /S *.ogl
robocopy C:\X4 C:\X4 /S /move
```
