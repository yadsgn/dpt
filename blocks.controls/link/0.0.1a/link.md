``` yaml
changes:
    - First version of page block
libs:
    wiki: 1.0.0a
```

# Ссылка

Ссылка классическая.
```jhtml
<b:link>Лос-Анджелес</b:link>
```

## Модификаторы

### m:type
#### minor
Менее якрая, для дополнительных действий.
```jhtml
<b:link m:type="minor">Ещё 10 новостей</b:link>
```

#### ghost
Приглушённая. Используется, например, в [cписке вертикалей](portal.vert).
```jhtml
<b:link m:type="ghost">Объявления</b:link>
```

#### outer
Для внешних источников.
```jhtml
<b:link m:type="outer">soundcloud.com</b:link>
```

#### strong
Для заголовков.
```jhtml
<b:link m:type="strong">Комплектующие</b:link>
```

#### black
Пригодится в случаях, когда на экране должно быть много ссылок.
```jhtml
<b:link m:type="black">ссылка</b:link>
```

##Параметры
###icon
Ссылка на фавиконку
```jhtml
<b:link icon="//market.yandex.ru/market2/i/duru.gif">Холодильники</b:link>
```
