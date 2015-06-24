``` yaml
changes:
    - First version of page block
libs:
    wiki: 1.0.0a
```

# Лоадер

Совпадает по высоте с [кнопкой](controls.button). Есть отдельный размер XS.

## Модификаторы
### m:size
```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:spinner m:size="XS"></b:spinner>
        </l:w-c>
        <l:w-c>XS</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:spinner m:size="S"></b:spinner>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:spinner></b:spinner>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:spinner m:size="L"></b:spinner>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```
