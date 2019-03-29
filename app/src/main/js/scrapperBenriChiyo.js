var a = `



5

        姪 37

6

        姪 00
        姪 11
          22
        姪 33
          46
        姪 58

7

          09
        姪 17
          28
        姪 37
        姪 47
          53

8

          03
        姪 12
          18
        姪 24
          33
        姪 42
          48
        姪 57

9

          04
        姪 12
          18
        姪 24
          29
        姪 35
          41
        姪 48
          57

10

        姪 05
          11
        姪 19
          27
        姪 33
          43
        西 49
          55

11

        西 04
          10
        西 17
          25
        西 33
          41
        西 48
          55

12

        西 02
          10
        西 17
          25
        西 32
          40
        西 47
          55

13

        西 02
          10
        西 17
          25
        西 33
          40
        西 47
          55

14

        西 02
          10
        西 18
          25
        西 33
          40
        西 47
          55

15

        西 02
          10
        西 17
          25
        西 33
          40
        姪 47
          55

16

        姪 03
          10
        姪 18
          25
        姪 32
          40
        姪 48
          57

17

        姪 05
          14
        姪 19
          27
        姪 33
          43
        姪 50
          57

18

        姪 06
          15
        姪 26
          33
        姪 39
          47
        姪 53
          59

19

        姪 05
          13
        姪 23
          35
          46
        姪 54

20

          04
        姪 13
          20
        姪 26
          36
        姪 48
        姪 57

21

          04
        姪 11
        姪 20
          36
        姪 51
          57

22

        姪 08
          22
        姪 35
        姪 53

23

          06
        姪 21
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
var name = 'chiyoTenjin'
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




