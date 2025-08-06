// services/gamificationService.js

class GamificationService {
    constructor() {
        // Alappontok és bónusz multiplikátorok
        this.pointsCalculator = {
            // Alappontok tevékenységtípusonként
            quiz: 5,
            challenge: 10,
            pitch: 25,

            // Bónusz multiplikátorok
            firstAttempt: 1.5,
            perfectScore: 2.0,
            earlyCompletion: 1.2,
        };
        
        // Rangsor szabályok pontküszöbökkel és ikonbadge-ekkel
        this.ranks = [
            { name: 'MI kezdő',              minPoints: 50,   badge: 'beginner.svg'    },
            { name: 'Szoftverfejlesztői MI szakértő', minPoints: 200,  badge: 'expert.svg'      },
            { name: 'Agilis MI-innovátor',   minPoints: 500,  badge: 'innovator.svg'   },
            { name: 'Digitális védelmező',   minPoints: 800,  badge: 'defender.svg'    },
            { name: 'MI algoritmus-építő mester',   minPoints: 1200, badge: 'master.svg'      },
            { name: 'Az év MI innovátorai',  minPoints: 1500, badge: 'champion.svg'    },
        ];
    }

    /**
     * Pontszám számítása tevékenység és teljesítmény alapján.
     * @param {Object} activity – { type: 'quiz'|'challenge'|'pitch' }
     * @param {Object} performance – { isFirstAttempt: boolean, score: number, completedEarly: boolean }
     * @returns {number} – Az összesen kapott pont (egész szám)
     */
    calculatePoints(activity, performance = {}) {
        const basePoints = this.pointsCalculator[activity.type] || 0;
        let multiplier = 1;

        if (performance.isFirstAttempt) {
            multiplier *= this.pointsCalculator.firstAttempt;
        }
        if (performance.score === 100) {
            multiplier *= this.pointsCalculator.perfectScore;
        }
        if (performance.completedEarly) {
            multiplier *= this.pointsCalculator.earlyCompletion;
        }

        return Math.round(basePoints * multiplier);
    }

    /**
     * Felhasználói rang frissítése a teljes pontszám alapján.
     * @param {number} totalPoints – A felhasználó összpontszáma
     * @returns {Object|null} – A megfelelő rang objektum, vagy null, ha egyik sem illik rá
     */
    getRankForPoints(totalPoints) {
        // Csak azok a rangok, ahol a minPoints <= totalPoints
        const eligibleRanks = this.ranks.filter(rank => totalPoints >= rank.minPoints);
        // A legmagasabb sorrendű, az utolsó
        return eligibleRanks.length > 0 ? eligibleRanks.pop() : null;
    }
}

module.exports = new GamificationService();
