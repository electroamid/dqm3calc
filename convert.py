import re

f = open('aaaaaa.txt', 'r', encoding='UTF-8')

datalist = f.readlines()
f.close()

tmpstr = ""
lastlank= ""
types= ["slime","dragon","natural","beast","material","daemon","zombie","unknown","!!!!!"]
typenum = 0
content = ""
content += "["

for line in enumerate(datalist):
    if line[0] % 2 ==0:
        tmpstr = '{"name":"' + str(line[1])[0:len(line)-4] + '",'
        content += tmpstr
        tmpstr = '"lank":"' + str(line[1])[len(line)-4:len(line)-3] + '",'
        content += tmpstr
        if lastlank == "X" or lastlank == "S":
            if str(line[1])[len(line)-4:len(line)-3] != "X" and str(line[1])[len(line)-4:len(line)-3] != "S":
                typenum += 1
        tmpstr = '"type":"' + types[typenum] + '",'
        content += tmpstr
        lastlank = str(line[1])[len(line)-4:len(line)-3]
    else:
        tmpstr = '"h":' + re.split(r'\s+',line[1])[0] + ','
        content += tmpstr
        tmpstr = '"m":' + re.split(r'\s+',line[1])[1] + ','
        content += tmpstr
        tmpstr = '"a":' + re.split(r'\s+',line[1])[2] + ','
        content += tmpstr
        tmpstr = '"d":' + re.split(r'\s+',line[1])[3] + ','
        content += tmpstr
        tmpstr = '"w":' + re.split(r'\s+',line[1])[4] + ','
        content += tmpstr
        tmpstr = '"s":' + re.split(r'\s+',line[1])[5]
        content += tmpstr
        content +="},\n"
content += "]"

print(content)
w = open('monster_data.json', 'w', encoding="UTF-8")
w.write(content)
w.close()