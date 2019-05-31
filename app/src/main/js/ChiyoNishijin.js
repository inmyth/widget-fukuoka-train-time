// use https://fukuoka-city-subway.jorudan.biz/pc/diagramdtl?mode=1&fr=%E5%8D%83%E4%BB%A3%E7%9C%8C%E5%BA%81%E5%8F%A3&frkbn=4&frsk=R&tosk=&dt=201905250000&dgm=%E5%8D%83%E4%BB%A3%E7%9C%8C%E5%BA%81%E5%8F%A3%3A%E7%A6%8F%E5%B2%A1%E5%9C%B0%E4%B8%8B%E9%89%84%E7%AE%B1%E5%B4%8E%E7%B7%9A%3A%E8%B2%9D%E5%A1%9A%EF%BC%88%E7%A6%8F%E5%B2%A1%EF%BC%89%3A%E9%A6%AC%E5%87%BA%E4%B9%9D%E5%A4%A7%E7%97%85%E9%99%A2%E5%89%8D%3A0&p=8%2C9

var a = `



5

        姪 37

6

        姪 01
        姪 21
        姪 44
          57

7

        姪 11
          23
        姪 34
          46
        姪 56

8

          05
        姪 13
          24
        姪 34
          39
        姪 48
        姪 56

9

          05
        姪 10
        姪 20
          26
        姪 32
          41
        姪 48
          54

10

        姪 02
          10
        姪 21
          26
        姪 33
          41
        西 47
          55

11

        西 03
          10
        西 19
          25
        姪 33
          40
        西 48
          55

12

        西 03
          10
        西 18
          25
        西 33
          40
        西 48
          55

13

        西 03
          10
        西 18
          26
        西 33
          40
        西 48
          55

14

        西 03
          10
        西 18
          25
        西 33
          40
        姪 49
          55

15

        西 03
          10
        西 18
          25
        西 33
          40
        姪 47
          57

16

        姪 05
          12
        姪 21
          28
        姪 35
          42
        姪 49
          56

17

        姪 04
        姪 12
          19
        姪 26
          36
        姪 47
          56

18

        姪 08
          18
        姪 29
          37
          45
        姪 54

19

          05
          15
        姪 22
          33
        姪 43
        姪 53

20

          00
        姪 10
          19
        姪 31
          44
        姪 58

21

        姪 08
        姪 21
        姪 32
          44
        姪 55

22

        姪 06
          15
        姪 24
        姪 35
        姪 47

23

          01
        姪 19
        姪 30
        姪 43

0

        姪 01
`

var a = a.split(/[\r\n]+/).filter(p => p !== '')
var h = -1
var res = []
for (i = 0; i < a.length; i++){
  if (!a[i].startsWith(' ')){
    h = a[i]
  }
  else {
  var p = a[i].trim()
      if (p.startsWith('姪') || p.startsWith('西')){
        res.push(h + p.substring(2))
      } else {
      res.push('*' + h + p)
      }
  }
}

res.forEach(p => console.log(p))
var name = 'chiyoTenjinHoliday'
res.forEach(p => {
   if (p.startsWith("00")) {
     p = "24" + p.substring(1)
   }
   if (p.startsWith('*')) {
      var z = p.substring(1)
      console.log(name + '.put(' + z + ', new Ref(' + z + ', true));')
   } else {
      console.log(name + '.put(' + p + ', new Ref(' + p + '));')
   }
})


//        nakasuKaizuka.put(542, new Ref(542));




