``` yaml
changes:
    - First version of page block
libs:
    wiki: 1.0.0a
    base:
    controls: 0.0.1a
```

# Инпут

## Состояния
- release: исходное
- hover: отклик на mouseover
- focus: фокус по нажатию или переходу клавишей tab
- empty: пустой
- filled: с текстом и крестиком для удаления содержимого

## Модификаторы
### type
#### normal
По умолчанию.
```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:input width="200"></b:input>
        </l:w-c>
        <l:w-c>release / empty</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" value="текст"></b:input>
        </l:w-c>
        <l:w-c>filled</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:hover width="200"></b:input>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:focus width="200"></b:input>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

#### shadow
С тенью. Чтобы обособиться от сложного фона: картинка, карта, фотография и пр.

```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:type="shadow"></b:input>
        </l:w-c>
        <l:w-c>release / empty</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:type="shadow" value="текст"></b:input>
        </l:w-c>
        <l:w-c>filled</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:hover width="200" m:type="shadow"></b:input>
        </l:w-c>
        <l:w-c>hover (нет)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:focus width="200" m:type="shadow"></b:input>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

#### button
Мимикрия под кнопку. Нужно крайне редко для однородной композиции. Например, контролы в шапке.
```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:type="button"></b:input>
        </l:w-c>
        <l:w-c>release / empty</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:type="button" value="текст"></b:input>
        </l:w-c>
        <l:w-c>filled</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:hover width="200" m:type="button"></b:input>
        </l:w-c>
        <l:w-c>hover</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:focus width="200" m:type="button"></b:input>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

#### button-shadow
```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:type="button-shadow"></b:input>
        </l:w-c>
        <l:w-c>release / empty</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:type="button-shadow" value="текст"></b:input>
        </l:w-c>
        <l:w-c>filled</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:hover width="200" m:type="button-shadow"></b:input>
        </l:w-c>
        <l:w-c>hover (нет)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input m:focus width="200" m:type="button-shadow"></b:input>
        </l:w-c>
        <l:w-c>focus</l:w-c>
    </l:w-r>
</l:w-g>
```

### size
Размер инпута.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:size="S"></b:input>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:size="M"></b:input>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:size="L"></b:input>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```
### pin
Спиливание границ для составления сложных монолитных комбинаций.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c  m:min>
            <b:input width="200" m:pin="left"></b:input>
        </l:w-c>
        <l:w-c>left</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:pin="right"></b:input>
        </l:w-c>
        <l:w-c>right</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:input width="200" m:pin="both"></b:input>
        </l:w-c>
        <l:w-c>both</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-s></l:w-s>
    </l:w-r>
    <l:w-r>
        <b:input hint="Куда" width="150" m:pin="right"></b:input>
        <b:input hint="Когда" width="150"></b:input>
    </l:w-r>    
</l:w-g>
```

## Параметры

### hint
Серая подсказка. Пропадает только в состоянии filled, а не по фокусу.
```jhtml_min
<b:input width="200" hint="Печатными буквами"></b:input>
```

### value
```jhtml_min
<b:input width="200" hint="Печатными буквами" value="praise the sun"></b:input>
```

### iconLeft & iconRight
```jhtml_min
<b:input width="200" hint="Печатными буквами" iconLeft="lock" iconRight="eye"></b:input>
```

```jhtml_min
<b:input width="200" hint="Печатными буквами" iconLeft="lock" value="praise the sun"></b:input>
```

```jhtml_min
<b:input width="200" hint="Печатными буквами" iconRight="eye" value="praise the sun"></b:input>
```

```jhtml_min
<b:input width="200" hint="Печатными буквами" iconRight="eye" iconLeft="lock" value="praise the sun"></b:input>
```
