// services/gamificationService.js
class GamificationService {
    constructor() {
        this.pointsCalculator = {
            // Alappontok lecke típusonként
            quiz: 5,
            challenge: 10,
            pitch: 25,
            
            // Bónusz multiplikátorok
            firstAttempt: 1.5,
            perfectScore: 2.0,
            earlyCompletion: 1.2
        };
        
        this.ranks = [
            { name: 'MI Kezdő', minPoints: 0, badge: 'beginner.svg' },
            { name: 'Szoftverfejlesztői MI szakértő', minPoints: 200, badge: 'expert.svg' },
            { name: 'Agilis MI-innovátor', minPoints: 500, badge: 'innovator.svg' },
            { name: 'Digitális védelmező', minPoints: 800, badge: 'defender.svg' },
            { name: 'MI algoritmus-építő mester', minPoints: 1200, badge: 'master.svg' },
            { name: 'Az év MI innovátorai', minPoints: 1500, badge: 'champion.svg' }
        ];
    }

    calculatePoints(activity, performance) {
        let basePoints = this.pointsCalculator[activity.type] || 0;
        let multiplier = 1;
        
        if (performance.isFirstAttempt) multiplier *= this.pointsCalculator.firstAttempt;
        if (performance.score === 100) multiplier *= this.pointsCalculator.perfectScore;
        
        return Math.round(basePoints * multiplier);
    }

    updateUserRank(userId, totalPoints) {
        const newRank = this.ranks
            .filter(rank => totalPoints >= rank.minPoints)
            .pop();
        
        return newRank;
    }
}
