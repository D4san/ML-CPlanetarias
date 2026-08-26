# Outbox hacia Obsidian

`outbox/` contiene observaciones y decisiones producidas durante el trabajo en el repositorio que deben revisarse en el vault.

Cada salida debe indicar:

```yaml
packet:
artifact:
vault_note:
vault_heading:
kind: observation | proposal | reproducible-error | decision
status: open
```

No se debe editar directamente una nota de Obsidian desde este canal sin una decisión explícita. Después de revisar una salida, marcarla como `accepted`, `rejected` o `deferred` y registrar el resultado en el paquete correspondiente.
