// use
// https://fukuoka-city-subway.jorudan.biz/pc/diagramdtl?mode=1&fr=%E5%A4%A9%E7%A5%9E&frkbn=4&frsk=R&tosk=&dt=201905250000&dgm=%E5%A4%A9%E7%A5%9E%3A%E7%A6%8F%E5%B2%A1%E5%9C%B0%E4%B8%8B%E9%89%84%E7%A9%BA%E6%B8%AF%E7%B7%9A%3A%E7%A6%8F%E5%B2%A1%E7%A9%BA%E6%B8%AF%3A%E4%B8%AD%E6%B4%B2%E5%B7%9D%E7%AB%AF%3A0&p=8%2C9

var a = `



5

          44
        貝 54
          56

6

          03
        貝 12
          16
          29
        貝 33
          43
        貝 47
          57

7

        貝 00
          06
        貝 10
        ● 18
          24
          29
        貝 32
        ● 37
          46
        貝 49
        ● 54

8

          02
        貝 07
        ● 10
          17
          23
        貝 26
          32
          38
        貝 41
        ● 44
          49
        貝 54
          56

9

        貝 01
          05
        貝 10
        ● 15
        貝 21
          24
        貝 29
          32
        ● 38
          44
        貝 47
        ● 50
          57

10

        貝 01
        ● 06
        貝 14
          16
        ● 23
          29
        貝 32
        ● 37
          45
        貝 48
          54

11

        貝 00
          02
        ● 08
          14
        貝 17
        ● 22
          29
        貝 32
        ● 37
          44
        貝 47
        ● 52
          59

12

        貝 02
        ● 07
          14
        貝 17
        ● 20
          29
        貝 32
        ● 38
          44
        貝 47
        ● 52
          59

13

        貝 03
        ● 08
          14
        貝 17
        ● 22
          29
        貝 32
        ● 38
          44
        貝 47
        ● 52
          59

14

        貝 02
        ● 09
        貝 15
        ● 18
          26
        貝 30
          33
        ● 38
          44
        貝 47
        ● 52
          59

15

        貝 02
        ● 07
          15
        貝 18
        ● 22
          28
        貝 31
        ● 35
          40
        貝 45
        ● 50
          57

16

        貝 01
        ● 04
          10
        貝 15
          18
        ● 24
          30
        貝 33
        ● 38
          44
        貝 47
        ● 51

17

        ● 00
          08
        貝 12
          16
        貝 20
          23
        ● 29
          35
          42
        貝 45
        ● 50
          55
          59

18

        貝 02
        ● 05
          13
        貝 20
          23
        ● 29
          34
        貝 37
        ● 40
        ● 47
          56

19

        貝 01
          05
        ● 11
        ● 19
          29
        貝 33
          38
        ● 44
          50
        貝 55
          58

20

        ● 06
          14
        貝 19
          22
        ● 27
          33
          41
        貝 45
          49
        貝 52
        ● 56

21

          03
          11
        貝 14
          19
        貝 25
          29
        貝 35
          40
        貝 46
          49
        ● 58

22

          08
        貝 11
        ● 18
          29
        貝 35
          42
        貝 45
          55
        貝 58

23

          04
          12
        貝 17
          21
          33
        貝 38
          46
        貝 57

0

          04
        博多 14


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
      if (p.startsWith('貝')){
        res.push(h + p.substring(2))
      } else if (p.startsWith('●')){
      res.push('*' + h + p.substring(2))
      }
  }
}

var name = 'tenjinKaizukaHoliday'
res.forEach(p => {
   if (p.startsWith('*')) {
      var z = p.substring(1)
      console.log(name + '.put(' + z + ', new Ref(' + z + ', true));')
   } else {
      console.log(name + '.put(' + p + ', new Ref(' + p + '));')
   }
})


//        nakasuKaizuka.put(542, new Ref(542));




