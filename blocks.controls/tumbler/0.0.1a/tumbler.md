``` yaml
changes:
    - First version of page block
libs:
    base:     0.0.1a
    controls:   0.0.1a
    portal:     0.0.1a
    wiki:       1.0.0a
```

# Тумблер

## Модификаторы
### m:size
```jhtml
<l:w-g m:gap-y="L" m:gap-x="S">
    <l:w-r>
        <l:w-c>
            <b:tumbler m:size="S"></b:tumbler>
        </l:w-c>
        <l:w-c>S</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:tumbler></b:tumbler>
        </l:w-c>
        <l:w-c>M (по умолчанию)</l:w-c>
    </l:w-r>
    <l:w-r>
        <l:w-c>
            <b:tumbler m:state="on" m:size="L"></b:tumbler>
        </l:w-c>
        <l:w-c>L</l:w-c>
    </l:w-r>
</l:w-g>
```
