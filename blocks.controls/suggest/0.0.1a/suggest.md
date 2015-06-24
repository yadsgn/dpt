``` yaml
changes:
    - First version of page block
libs:
    wiki: 1.0.0a
    base: 
    controls:
```

# Саджест

## Вертикали

```jhtml 
<b:suggest m:demo="yes">
    <e:group title="Поиск">
        <e:item><b>Почему</b> трава зеленая</e:item>
        <e:item><b>Почему</b> нельзя фотографировать спящих</e:item>
        <e:item><b>Почему</b> нельзя смотреть в зеркало ночью</e:item>
        <e:item><b>Почему</b> кошка топчет вас лапками</e:item>
        <e:item><b>Почему</b> потеют пластиковые окна</e:item>
    </e:group>
    <e:group title="Картинки">
        <e:item><b>Почему</b> нельзя фотографировать спящих</e:item>
        <e:item><b>Почему</b> нельзя смотреть в зеркало ночью</e:item>
    </e:group>
    <e:group title="Видео">
        <e:item><b>Почему</b> кошка топчет вас лапками</e:item>
        <e:item><b>Почему</b> потеют пластиковые окна</e:item>
    </e:group>
</b:suggest>
```

## Факты

```jhtml
<b:suggest m:demo="yes">
    <group title="Поиск">
        <item icon="traffic" hint="5 баллов"><b>про</b>бки</item>
        <item>программы на айфон</item>
        <item>программа передач на сегодня</item>
        <item icon="weather" hint="+12 ºС"><b>пог</b>ода</item>
        <item>погода</item>
        <item>погода в Москве на 14 дней</item>
        <item icon="fact" hint="172 см"><b>рост пу</b>тина</item>
        <item>рост петра I</item>
        <item icon="fact" hint="ln(cos x + i sin x) = ix"><b>формула эй</b>лера</item>
    </group>
</b:suggest>
```

## История

```jhtml
<b:suggest m:demo="yes">
    <group title="Поиск">
        <item type="history"><b>Почему</b> трава зеленая</item>
        <item><b>Почему</b> нельзя фотографировать спящих</item>
        <item><b>Почему</b> нельзя смотреть в зеркало ночью</item>
        <item><b>Почему</b> кошка топчет вас лапками</item>
        <item><b>Почему</b> потеют пластиковые окна</item>
    </group>
    <group title="Картинки">
        <item type="history"><b>Почему</b> нельзя фотографировать спящих</item>
        <item><b>Почему</b> нельзя смотреть в зеркало ночью</item>
    </group>
</b:suggest>
```

## Навигационник

```jhtml
<b:suggest m:demo="yes">
    <group title="Сайт">
        <item type="nav"><b>face</b>book.com — международная социальная сеть</item>
    </group>
    <group title="Поиск">
        <item><b>face</b>book</item>
        <item><b>face</b>book моя страница</item>
        <item><b>face</b>palm</item>
        <item><b>face</b>time</item>
        <item><b>face</b>book одноклассники</item>
    </group>
</b:suggest>
```

