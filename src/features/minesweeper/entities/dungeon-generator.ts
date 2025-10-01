import { BOARD_SIZE, ITEMS, MONSTERS, type GameEntity } from '@/lib/config/game-config';

export interface Cell {
  entity: GameEntity | null;
  revealed: boolean;
  executed: boolean;
  marked: number | null;
}

export class DungeonGenerator {
  public width: number;
  public height: number;
  public board: Cell[][];
  public startPos: { x: number; y: number };

  constructor() {
    this.width = BOARD_SIZE.width;
    this.height = BOARD_SIZE.height;
    this.board = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => ({
        entity: null,
        revealed: false,
        marked: null,
        executed: false,
      })),
    );
    this.startPos = {
      x: 0,
      y: 0,
    };
  }

  public generateBoard(): Cell[][] {
    this.setStartPos();
    this.placeFixedEntities();
    this.placeWalls();
    this.placeRandomMonstersAndItems();
    this.secureSafeZone();
    return this.board;
  }

  public setStartPos(): void {
    // 맵의 중앙에 다크로드가 고정되어 있으므로, 몬스터가 없는 안전한 시작 위치를 찾습니다.
    const margin = 2; // 맵의 가장자리로부터 2칸 여유를 둡니다.
    const minX = margin;
    const maxX = this.width - 1 - margin;
    const minY = margin;
    const maxY = this.height - 1 - margin;

    let attempts = 100;
    while (attempts > 0) {
      const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      // 다크로드와 주변 몬스터를 피해 안전한 시작점을 찾습니다.
      if (!this.board[y][x].entity && !this.isNearFixedEntity(x, y)) {
        this.startPos = { x, y };
        this.placeEntity(x, y, ITEMS.pickDefault);
        return;
      }
      attempts--;
    }

    // 안전한 위치를 찾지 못한 경우, 기본값으로 중앙을 설정합니다.
    this.startPos = {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2),
    };
    this.board[this.startPos.y][this.startPos.x].entity = ITEMS.pickDefault;
  }

  // 몬스터 근처에 있는지 확인하는 헬퍼 메서드 추가
  private isNearFixedEntity(x: number, y: number): boolean {
    const checkRadius = 3; // 다크로드 및 다른 고정 몬스터로부터의 안전 거리를 설정
    const darkLordPos = { x: Math.floor(this.width / 2), y: Math.floor(this.height / 2) };

    // 다크로드와의 거리가 너무 가까우면 false 반환
    if (Math.abs(x - darkLordPos.x) <= checkRadius && Math.abs(y - darkLordPos.y) <= checkRadius) {
      return true;
    }

    return false;
  }

  private placeEntity(x: number, y: number, entity: GameEntity): boolean {
    if (!this.isValidPosition(x, y) || this.board[y][x].entity) {
      return false;
    }

    if (entity.id === MONSTERS.darkLord.id) {
      this.board[y][x].entity = entity;
      this.board[y][x].revealed = true;
      return true;
    }
    this.board[y][x].entity = entity;
    return true;
  }

  private placeFixedEntities() {
    // 1. Fix DarkLord in the center of the dungeon
    const darkLordPos = {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2),
    };
    this.placeEntity(darkLordPos.x, darkLordPos.y, MONSTERS.darkLord);

    // 2. Fix darkCrystal in the corners of the dungeon
    const crystalPositions = [
      { x: darkLordPos.x - 1, y: darkLordPos.y },
      { x: darkLordPos.x + 1, y: darkLordPos.y },
      { x: darkLordPos.x, y: darkLordPos.y - 1 },
      { x: darkLordPos.x, y: darkLordPos.y + 1 },
    ];

    const selectedCrystalPos =
      crystalPositions[Math.floor(Math.random() * crystalPositions.length)];
    if (this.isValidPosition(selectedCrystalPos.x, selectedCrystalPos.y)) {
      this.placeEntity(selectedCrystalPos.x, selectedCrystalPos.y, ITEMS.darkCrystal);
    }

    // 3. Fix MineSeeker in a corner of the dungeon
    const corners = [
      { x: 0, y: 0 },
      { x: 0, y: this.height - 1 },
      { x: this.width - 1, y: 0 },
      { x: this.width - 1, y: this.height - 1 },
    ];

    const selectedCorner = corners[Math.floor(Math.random() * corners.length)];
    this.placeEntity(selectedCorner.x, selectedCorner.y, MONSTERS.mineSeeker);

    // 4. Magician and PoisonMushroom
    const magicianPos = this.findWallPosition();
    if (magicianPos) {
      this.placeEntity(magicianPos.x, magicianPos.y, MONSTERS.magician);
      // 마법사 근처에 5개의 독버섯을 배치합니다.
      this.placeClusterAtPosition(MONSTERS.poisonMushroom, 5, magicianPos);
    }
    this.placeRandomly(MONSTERS.bunny, 2);
    this.placeRandomly(MONSTERS.mimic);
    const eyeCount = 2;
    for (let i = 0; i < eyeCount; i++) {
      const eyePos = this.findRandomEmptyPosition();
      if (eyePos) {
        this.placeEntity(eyePos.x, eyePos.y, MONSTERS.eye);
      }
    }

    this.placeRandomly(MONSTERS.monkey);
  }

  private placeRandomMonstersAndItems() {
    // 1. Place 9 of the cell with mines
    const mineCount = 9;
    this.placeRandomly(MONSTERS.mine, mineCount, 2);

    // 2. Place eliteMonsters
    this.placeRandomly(MONSTERS.cobra, 8, 2);
    this.placeRandomly(MONSTERS.giant, 5, 6);
    this.placeRandomly(MONSTERS.mushroom, 5, 2);
    this.placeRandomly(MONSTERS.shadow, 1);

    // 3. Place Gargoyle
    // Place around wall or nearby mushroom cluster
    const gargoyleCount = 4;
    for (let i = 0; i < gargoyleCount; i++) {
      let attempts = 100;
      while (attempts > 0) {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);
        if (this.isNearWallOrMushroom(x, y) && this.placeEntity(x, y, MONSTERS.gargoyle)) {
          break;
        }
        attempts--;
      }
    }

    // 4. Place normal monster clusters
    this.placeClusterByCount(MONSTERS.spider, 13, 2, 5); // 2~5
    this.placeClusterByCount(MONSTERS.poisonSpider, 12, 2, 2); // 2
    this.placeClusterByCount(MONSTERS.goblin, 10, 1, 3); // 1~3

    const boxCount = 5;
    this.placeRandomly(ITEMS.boxClose, boxCount);
    this.placeRandomly(ITEMS.hpItem, 4);
    this.placeRandomly(ITEMS.pickDefault, 1);
  }

  private findWallPosition(): { x: number; y: number } | null {
    let attempts = 100;
    while (attempts > 0) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      // 벽 근처이고 코너가 아닌 위치를 찾습니다.
      if (this.isNearWall(x, y) && !this.isCorner(x, y) && !this.board[y][x].entity) {
        return { x, y };
      }
      attempts--;
    }
    return null;
  }

  private isNearWall(x: number, y: number): boolean {
    return x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1;
  }

  private isCorner(x: number, y: number): boolean {
    return (
      (x === 0 && y === 0) ||
      (x === this.width - 1 && y === 0) ||
      (x === 0 && y === this.height - 1) ||
      (x === this.width - 1 && y === this.height - 1)
    );
  }

  private isNearWallOrMushroom(x: number, y: number): boolean {
    if (x <= 1 || y <= 1 || x >= this.width - 2 || y >= this.height - 2) {
      return true;
    }

    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          this.isValidPosition(nx, ny) &&
          (this.board[ny][nx].entity?.id === 'mushroom' ||
            this.board[ny][nx].entity?.id === 'poison_mushroom')
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private placeWalls() {
    const wallCount = 6;
    let placedCount = 0;

    while (placedCount < wallCount) {
      const startPos = this.findRandomEmptyPosition();
      if (!startPos) break;

      const isHorizontal = Math.random() < 0.5;
      let success = false;

      if (isHorizontal) {
        if (
          this.isValidPosition(startPos.x + 1, startPos.y) &&
          !this.board[startPos.y][startPos.x + 1].entity
        ) {
          if (
            this.placeEntity(startPos.x, startPos.y, ITEMS.wall1) &&
            this.placeEntity(startPos.x + 1, startPos.y, ITEMS.wall1)
          ) {
            placedCount += 2;
            success = true;
          }
        }
      } else {
        if (
          this.isValidPosition(startPos.x, startPos.y + 1) &&
          !this.board[startPos.y + 1][startPos.x].entity
        ) {
          if (
            this.placeEntity(startPos.x, startPos.y, ITEMS.wall1) &&
            this.placeEntity(startPos.x, startPos.y + 1, ITEMS.wall1)
          ) {
            placedCount += 2;
            success = true;
          }
        }
      }

      if (!success) {
        continue;
      }
    }
  }

  private placeClusterByCount(
    entity: GameEntity,
    totalCount: number,
    minSize: number,
    maxSize: number,
  ) {
    let placedCount = 0;
    while (placedCount < totalCount) {
      const clusterSize = Math.min(
        Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
        totalCount - placedCount,
      );
      const startPos = this.findRandomEmptyPosition();
      if (!startPos) break;

      for (let i = 0; i < clusterSize; i++) {
        const x = startPos.x + Math.floor(Math.random() * 3) - 1;
        const y = startPos.y + Math.floor(Math.random() * 3) - 1;

        if (this.placeEntity(x, y, entity)) {
          placedCount++;
        }
      }
    }
  }

  private placeClusterAtPosition(
    entity: GameEntity,
    count: number,
    centerPos: { x: number; y: number },
  ) {
    for (let i = 0; i < count; i++) {
      let attempts = 100;
      while (attempts > 0) {
        const x = centerPos.x + Math.floor(Math.random() * 3) - 1;
        const y = centerPos.y + Math.floor(Math.random() * 3) - 1;

        if (this.placeEntity(x, y, entity)) {
          break;
        }
        attempts--;
      }
    }
  }

  private placeRandomly(entity: GameEntity, count: number = 1, _distFromStart?: number) {
    for (let i = 0; i < count; i++) {
      let attempts = 300;
      while (attempts > 0) {
        const x = Math.floor(Math.random() * this.width);
        const y = Math.floor(Math.random() * this.height);

        // Check if the cell is already occupied
        if (this.board[y][x].entity) {
          attempts--;
          continue;
        }

        // Optional: Check distance from start
        const distFromStart = Math.abs(x - this.startPos.x) + Math.abs(y - this.startPos.y);
        if (_distFromStart && distFromStart <= _distFromStart) {
          attempts--;
          continue;
        }

        // New logic: Check if a mine already exists in a 3x3 area around the new position
        let isTooClose = false;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (this.isValidPosition(nx, ny) && this.board[ny][nx].entity?.id === entity.id) {
              isTooClose = true;
              break;
            }
          }
          if (isTooClose) break;
        }

        if (isTooClose) {
          attempts--;
          continue;
        }

        // All checks passed, place the entity
        this.board[y][x].entity = entity;
        if (entity.id === ITEMS.boxClose.id) {
          const random = Math.random();
          const isExp = random > 0.5;
          this.board[y][x].entity = {
            ...entity,
            xp: isExp ? 5 : 0,
          };
        } else {
          this.board[y][x].entity = entity;
        }
        break;
      }
    }
  }

  private secureSafeZone() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const dist = Math.abs(x - this.startPos.x) + Math.abs(y - this.startPos.y);
        const cell = this.board[y][x];

        if (dist <= 2 && cell.entity?.type === 'monster' && cell.entity.power > 2) {
          if (cell.entity.id !== MONSTERS.darkLord.id && cell.entity.id !== MONSTERS.mine.id) {
            this.board[y][x].entity = MONSTERS.spider;
          }
        }
      }
    }
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  private findRandomEmptyPosition(): { x: number; y: number } | null {
    let attempts = 150;
    while (attempts > 0) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      if (!this.board[y][x].entity) {
        return { x, y };
      }
      attempts--;
    }
    return null;
  }
}
