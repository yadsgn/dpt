``` yaml
changes:
    - First version of page block
libs:
    base:       0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Меню

## Модификаторы
### m:size

#### M
по умолчанию
```jhtml_no-margin
<b:menu m:size="M">
    <item>Показать ещё с сайта</item>
    <item>Сохраненная копия</item>
    <item>Перевод</item>
</b:menu>
```

#### L
```jhtml_no-margin
<b:menu m:size="L">
    <item>Показать ещё с сайта</item>
    <item>Сохраненная копия</item>
    <item>Перевод</item>
</b:menu>
```

## Элементы

### group

```jhtml_no-margin
<b:menu>
    <group>
        <item>Назад</item>
        <item>Вперед</item>
        <item>Перезагрузить</item>
    </group>
    <group>
        <item>Проверить элемент</item>
        <item>Просмотреть код</item>
    </group>
    <group>
        <item>Сменить фон</item>
    </group>
</b:menu>
```

С заголовком
```jhtml_no-margin
<b:menu>
    <group title="Со страницей">
        <item>Назад</item>
        <item>Вперед</item>
        <item>Перезагрузить</item>
    </group>
    <group title="С содержимым">
        <item>Проверить элемент</item>
        <item>Просмотреть код</item>
    </group>
    <group>
        <item>Сменить фон</item>
    </group>
</b:menu>
```

#icon

```jhtml_no-margin
<l:b>
    <b:menu>
        <group>
            <item icon="http://favicon.yandex.net/favicon/twitter.com">Твиттер</item>
            <item icon="http://favicon.yandex.net/favicon/facebook.com">Фейсбук</item>
            <item icon="http://favicon.yandex.net/favicon/vk.com">Ну вы поняли</item>
        </group>
        <group title="А также">
            <item icon="http://favicon.yandex.net/favicon/odnoklassniki.ru">Маргиналы</item>
            <item icon="http://favicon.yandex.net/favicon/linkedin.com">Фрики</item>
        </group>
    </b:menu>
</l:b>
```

#mode

##check

```jhtml_no-margin
<l:b>
    <b:menu m:mode="check">
        <group>
            <item m:state="check">Мясо</item>
            <item m:state="check">Рыба</item>
            <item>Газетка</item>
        </group>
        <group title="А также">
            <item>Перхоть</item>
            <item>Ногти</item>
        </group>
    </b:menu>
</l:b>
```

##radio

```jhtml_no-margin
<l:b>
    <b:menu m:mode="radio">
        <group title="Что-то одно">
            <item>Мясо</item>
            <item>Рыба</item>
            <item>Газетка</item>
        </group>
        <group title="Быть может, вот ещё">
            <item m:state="check" icon="http://favicon.yandex.net/favicon/youtube.com">Перхоть</item>
            <item icon="http://favicon.yandex.net/favicon/vimeo.com">Ногти</item>
        </group>
    </b:menu>
</l:b>
```


