## run the server NestJS
```
nx serve server
```

## run the client Angular
```
nx serve client
```

## run the client and server
```
nx run-many --target=serve --projects=client,server
```
or  
```
nx run-many --target=serve --all
```

## check tags
```
grep tags {libs,apps}/**/project.json
```

## lint all
```
nx run-many --target=lint --all
```

## stop listening server
check PID  
```
lsof -i :3000
```
kill PID  
```
kill <PID>
```