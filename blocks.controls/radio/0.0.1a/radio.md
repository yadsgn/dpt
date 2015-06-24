``` yaml
changes:
    - First version of the block
libs:
    base:     0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Радиокнопка

## Модификаторы

### type
Наследуется от [кнопки](controls.button).

#### normal
По умолчанию

```jhtml_min
<b:radio m:group="1" m:state="check">Опция 1</b:radio>
<l:w-br></l:w-br>
<b:radio m:group="1">Опция 2</b:radio>
```

#### pseudo
```jhtml_min-transparent
<b:radio m:group="2" m:state="check" m:type="pseudo">Опция 1</b:radio>
<l:w-br></l:w-br>
<b:radio m:group="2" m:type="pseudo">Опция 2</b:radio>
```

### size
Размер радиокнопки.

```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="L">
    <l:w-r>
        <l:w-c>
            <b:radio m:group="3" m:state="check">Опция 1</b:radio>
            <l:w-br></l:w-br>
            <b:radio m:group="3">Опция 2</b:radio>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:radio m:group="4" m:size="L" m:state="check">Опция 1</b:radio>
            <l:w-br></l:w-br>
            <b:radio m:group="4" m:size="L">Опция 2</b:radio>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```

### disable

```jhtml_min
<b:radio m:group="1" m:state="check" m:disable>Опция 1</b:radio>
<l:w-br></l:w-br>
<b:radio m:group="1" m:disable>Опция 2</b:radio>
```