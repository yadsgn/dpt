``` yaml
changes:
    - First version of page block
libs:
    wiki:       1.0.0a
    controls:   0.0.1a
```

# Чекбокс

## Модификаторы
### type
```jhtml_min-transparent
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:check>Чекбокс</b:check>
        </l:w-c>
        <l:w-c>normal (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:check m:type="pseudo">Чекбокс</b:check>
        </l:w-c>
        <l:w-c>pseudo</l:w-c>
    </l:w-r>
</l:w-g>
```


### size
```jhtml_min
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:check m:size="M">Чекбокс</b:check>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:check m:size="L">Чекбокс</b:check>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```

### disable
```jhtml_min
<b:check m:disable>Чекбокс</b:check>
```