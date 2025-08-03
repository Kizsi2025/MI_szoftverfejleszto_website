// controllers/progressController.js
class ProgressController {
    async checkLessonAccess(userId, lessonId) {
        const lesson = await Lesson.findById(lessonId);
        const userProgress = await UserProgress.findByUserId(userId);
        
        // Ellenőrizzük a függőségeket
        if (lesson.unlock_requirements && lesson.unlock_requirements.length > 0) {
            const completedLessons = userProgress
                .filter(p => p.status === 'completed')
                .map(p => p.lesson_id);
                
            const hasPrerequisites = lesson.unlock_requirements
                .every(reqId => completedLessons.includes(reqId));
                
            if (!hasPrerequisites) {
                throw new Error('Előző leckéket kell teljesíteni');
            }
        }
        
        return true;
    }

    async updateProgress(userId, lessonId, activityData) {
        const points = await this.gamificationService
            .calculatePoints(activityData.activity, activityData.performance);
            
        await UserProgress.updatePoints(userId, lessonId, points);
        
        // Rangfrissítés ellenőrzése
        const totalPoints = await User.getTotalPoints(userId);
        const newRank = await this.gamificationService.updateUserRank(userId, totalPoints);
        
        return { points, newRank, totalPoints };
    }
}
