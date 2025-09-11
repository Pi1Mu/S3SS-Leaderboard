export const VERSIONS: string[] = [
  '1.21.1',
  '1.21',
  '1.20.6',
  '1.20.4',
  '1.20.2',
  '1.20.1',
  '1.20',
  '1.19.4',
  '1.19.3',
  '1.19.2'
]

export interface VersionOption {
  value: string
  label: string
}

export const VERSION_OPTIONS: VersionOption[] = VERSIONS.map(version => ({
  value: version,
  label: version
}))